"use client";

import React, { useEffect, useRef } from "react";

export interface FlowLinesCanvasProps {
  heroRef: React.RefObject<HTMLElement | null>;
  subjectRef: React.RefObject<HTMLElement | null>;
  crossFraction?: { x: number; y: number };
}

const VERT_SRC = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG_SRC = `#version 300 es
precision highp float;
uniform vec2  uRes;     // canvas size, device px
uniform float uDpr;
uniform float uTime;    // seconds since mount, never wrapped
uniform vec2  uCenter;  // subject centre (the cross), css px, relative to the hero
uniform vec4  uRect;    // SDF rect on screen, css px: x, y, w, h
uniform float uSdfMax;  // css px that an SDF value of 1.0 represents
uniform float uScale;   // hero width / 1280
uniform float uReveal;  // 0..1 intro progress, already eased
uniform sampler2D uSdf;
out vec4 outColor;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float smax(float a, float b, float k){
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}
float subjectDist(vec2 p){                    // css px; 0 inside the silhouette
  vec2 hs = uRect.zw * 0.5;
  vec2 q  = p - (uRect.xy + hs);
  vec2 uv = (clamp(q, -hs, hs) + hs) / uRect.zw;
  return texture(uSdf, uv).r * uSdfMax + length(max(abs(q) - hs, 0.0));
}
void main(){
  vec2 p  = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;   // css px
  float s = uScale, t = uTime;

  float dS = subjectDist(p) / s;              // below: 1280-wide units
  vec2  q  = (p - uCenter) / s;
  vec2  a  = abs(q) / vec2(640.0, 960.0);     // wide in x, tall in y: near-vertical lines at the sides
  float dE = pow(pow(a.x, 2.6) + pow(a.y, 2.6), 1.0 / 2.6) * 640.0;
  float base0 = smax(dS, dE - 200.0, 100.0);  // hug the outline close up, rounded ovals far out

  vec2  np   = q * 0.0011;
  float n1   = vnoise(np + vec2(t * 0.008, 0.0));
  float n2   = vnoise(np * 1.9 + vec2(7.1, t * -0.012));
  float warp = 28.0 * ((n1 * 0.78 + n2 * 0.22) - 0.5) * 2.0 * smoothstep(0.0, 400.0, base0);
  float base = max(base0 + warp, 0.0);

  float u = pow(base / 52.0, 0.92) - t * 0.14;           // minus t: lines travel outward
  float w = fwidth(u);
  float dist = 0.5 - abs(fract(u) - 0.5);                // 0 on a line centre
  float hw = 0.5 * uDpr * w;                             // half of a 1 css px line, in u units
  float line = 1.0 - smoothstep(hw, hw + w, dist);

  float alpha = mix(0.70, 0.30, smoothstep(150.0, 1100.0, base));
  alpha *= smoothstep(0.0, 60.0, dS);                    // nothing drawn across the subject

  float R  = uReveal * 1.3 * length(uRes / uDpr);        // intro: the front expands from the subject
  float rv = 1.0 - smoothstep(R - 120.0, R, length(p - uCenter));
  float o  = alpha * line * rv;
  outColor = vec4(vec3(o), o);                           // premultiplied white
}
`;

export default function FlowLinesCanvas({
  heroRef,
  subjectRef,
  crossFraction = { x: 0.5193, y: 0.5044 },
}: FlowLinesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const subject = subjectRef.current;
    if (!canvas || !hero || !subject) return;

    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
    });
    if (!gl) return;

    // Compile shader helper
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = createShader(gl.VERTEX_SHADER, VERT_SRC);
    const frag = createShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Fullscreen triangle buffer: [-1,-1, 3,-1, -1,3]
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(prog, "uRes");
    const uDprLoc = gl.getUniformLocation(prog, "uDpr");
    const uTimeLoc = gl.getUniformLocation(prog, "uTime");
    const uCenterLoc = gl.getUniformLocation(prog, "uCenter");
    const uRectLoc = gl.getUniformLocation(prog, "uRect");
    const uSdfMaxLoc = gl.getUniformLocation(prog, "uSdfMax");
    const uScaleLoc = gl.getUniformLocation(prog, "uScale");
    const uRevealLoc = gl.getUniformLocation(prog, "uReveal");
    const uSdfLoc = gl.getUniformLocation(prog, "uSdf");

    // Load SDF Texture
    const sdfTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sdfTex);
    // 1x1 placeholder
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 255, 255, 255])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const sdfImg = new Image();
    sdfImg.src = "/hero/stethoscope-sdf.png";
    sdfImg.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, sdfTex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        sdfImg
      );
    };

    const cfg = {
      sdfMaxTexPx: 300.0,
      sdfTexH: 452.0,
      cross: crossFraction,
    };

    const t0 = performance.now();
    const dprCap = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches ? 1.5 : 2;
    let U = {
      dpr: 1,
      rect: [0, 0, 0, 0],
      center: [0, 0],
      sdfMax: 0,
      scale: 1,
    };

    function layout() {
      if (!canvas || !hero || !subject) return;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl?.viewport(0, 0, canvas.width, canvas.height);

      const heroRect = hero.getBoundingClientRect();
      const subRect = subject.getBoundingClientRect();
      const r = [
        subRect.left - heroRect.left,
        subRect.top - heroRect.top,
        subRect.width,
        subRect.height,
      ];
      U = {
        dpr,
        rect: r,
        center: [
          r[0] + r[2] * cfg.cross.x,
          r[1] + r[3] * cfg.cross.y,
        ],
        sdfMax: (cfg.sdfMaxTexPx * r[3]) / cfg.sdfTexH,
        scale: Math.max(0.6, w / 1280.0),
      };
    }

    layout();
    const ro = new ResizeObserver(() => layout());
    ro.observe(hero);
    ro.observe(subject);

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, x), 3);

    let rafId = 0;
    let isVisible = true;

    function render(now: number, still = false) {
      if (!gl) return;
      const t = still ? 12 : (now - t0) / 1000;
      const reveal = still ? 1 : ease(t / 2.2);

      gl.useProgram(prog);
      gl.bindVertexArray(vao);

      gl.uniform2f(uResLoc, canvas!.width, canvas!.height);
      gl.uniform1f(uDprLoc, U.dpr);
      gl.uniform1f(uTimeLoc, t);
      gl.uniform2f(uCenterLoc, U.center[0], U.center[1]);
      gl.uniform4f(uRectLoc, U.rect[0], U.rect[1], U.rect[2], U.rect[3]);
      gl.uniform1f(uSdfMaxLoc, U.sdfMax);
      gl.uniform1f(uScaleLoc, U.scale);
      gl.uniform1f(uRevealLoc, reveal);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sdfTex);
      gl.uniform1i(uSdfLoc, 0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    if (prefersReducedMotion) {
      render(performance.now(), true);
    } else {
      function loop(now: number) {
        if (isVisible) {
          render(now);
        }
        rafId = requestAnimationFrame(loop);
      }
      rafId = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && document.visibilityState === "visible";
    });
    io.observe(hero);

    const onVisChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, [heroRef, subjectRef, crossFraction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
