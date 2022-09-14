import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { config } from "../config";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const COUNT = 800;
    const SPEED = 0.1;
    class Star {
      x: number;
      y: number;
      z: number;
      xPrev: number;
      yPrev: number;
      constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.xPrev = x;
        this.yPrev = y;
      }
      update(width: number, height: number, speed: number) {
        this.xPrev = this.x;
        this.yPrev = this.y;
        this.z += speed * 0.0675;
        this.x += this.x * (speed * 0.0225) * this.z;
        this.y += this.y * (speed * 0.0225) * this.z;
        if (
          this.x > width / 2 ||
          this.x < -width / 2 ||
          this.y > height / 2 ||
          this.y < -height / 2
        ) {
          this.x = Math.random() * width - width / 2;
          this.y = Math.random() * height - height / 2;
          this.xPrev = this.x;
          this.yPrev = this.y;
          this.z = 0;
        }
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = this.z;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.xPrev, this.yPrev);
        ctx.stroke();
      }
    }
    const stars = Array.from({ length: COUNT }, () => new Star(0, 0, 0));
    let rafId = 0;
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
    const ctx = canvas.getContext("2d")!;
    const container = ref.current!;
    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(container);
    function setup() {
      rafId > 0 && cancelAnimationFrame(rafId);
      const { clientWidth: width, clientHeight: height } = container;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height + 1}px`;
      ctx.scale(dpr, dpr);
      for (const star of stars) {
        star.x = Math.random() * width - width / 2;
        star.y = Math.random() * height - height / 2;
        star.z = 0;
      }
      ctx.translate(width / 2, height / 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.strokeStyle = "white";
      rafId = requestAnimationFrame(frame);
    }
    function frame() {
      const { clientWidth: width, clientHeight: height } = container;
      for (const star of stars) {
        star.update(width, height, SPEED);
        star.draw(ctx);
      }
      ctx.fillRect(-width / 2, -height / 2, width, height);
      rafId = requestAnimationFrame(frame);
    }
  }, []);
  return (
    <div ref={ref} className="h-screen relative overflow-hidden">
      <canvas id="canvas"></canvas>
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center">
        <div className="space-y-10">
          <h1 className="py-10 font-serif text-center font-extrabold  text-8xl bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-purple-500  to-pink-500">
            {config.banner}
          </h1>
          <div className="flex items-center justify-center">
            <Link href="/blog">
              <a className="border-indigo-500 text-indigo-500  border px-10 py-5 text-xl">
                全部文章
              </a>
            </Link>
          </div>
        </div>
        <div className="relative scale-50 md:scale-100">
          <div className="locket"></div>
          <div className="flames"></div>
        </div>
      </div>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
