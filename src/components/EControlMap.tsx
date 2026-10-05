"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import "leaflet/dist/leaflet.css";
import { IconPin, IconTruck } from "@/components/icons";
import { ROUTE_BOUNDS, ROUTE_POINTS } from "@/lib/econtrolRoute";

type LeafletMap = import("leaflet").Map;

const FIT_OPTIONS = { padding: [26, 26] as [number, number], maxZoom: 15, animate: false };

const pct = (value: number, total: number) => `${((value / total) * 100).toFixed(3)}%`;

function place(ref: RefObject<HTMLSpanElement | null>, x: number, y: number, w: number, h: number) {
  const el = ref.current;
  if (!el) return;
  el.style.left = pct(x, w);
  el.style.top = pct(y, h);
}

/**
 * Fundo de mapa real (OpenStreetMap via Leaflet) da vitrine do E-Control.
 *
 * - Mapa decorativo: sem zoom, sem arraste e sem rotação, para não sequestrar
 *   o scroll da página. `fitBounds` calcula centro/zoom para a rota preencher
 *   o quadro em qualquer breakpoint.
 * - Tiles em escala de cinza, para a rota e os cards serem o único ponto de cor.
 * - O traço da rota é a geometria real do OSRM (ver `@/lib/econtrolRoute`),
 *   projetada nos pixels do mapa — ele acompanha as ruas, não uma curva solta.
 * - Por baixo dos tiles existe um mapa vetorial de reserva em cinza: se a rede
 *   não entregar os tiles, a área continua lendo como um mapa.
 */
export default function EControlMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const casingRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const originRef = useRef<HTMLSpanElement>(null);
  const destRef = useRef<HTMLSpanElement>(null);
  const stopOneRef = useRef<HTMLSpanElement>(null);
  const stopTwoRef = useRef<HTMLSpanElement>(null);

  /** Reprojeta rota, marcadores e nós a partir do centro/zoom atuais. */
  const draw = useCallback(() => {
    const host = hostRef.current;
    const map = mapRef.current;
    const svg = svgRef.current;
    const casing = casingRef.current;
    const line = lineRef.current;
    if (!host || !map || !svg || !casing || !line) return;

    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;

    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    // o Leaflet projeta em relação ao próprio container, que ocupa exatamente
    // o mesmo retângulo do SVG por cima dele
    const points = ROUTE_POINTS.map((latlng) => map.latLngToContainerPoint(latlng));
    const d = `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`;
    casing.setAttribute("d", d);
    line.setAttribute("d", d);

    const at = (ratio: number) => points[Math.round((points.length - 1) * ratio)];
    place(originRef, points[0].x, points[0].y, w, h);
    place(destRef, points[points.length - 1].x, points[points.length - 1].y, w, h);
    place(stopOneRef, at(0.34).x, at(0.34).y, w, h);
    place(stopTwoRef, at(0.72).x, at(0.72).y, w, h);

    const mid = at(0.5);
    pulseRef.current?.setAttribute("cx", mid.x.toFixed(1));
    pulseRef.current?.setAttribute("cy", mid.y.toFixed(1));

    // revela rota e marcadores só depois que estão nas posições certas
    wrapRef.current?.classList.add("is-ready");
  }, []);

  const refit = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    map.invalidateSize({ animate: false });
    map.fitBounds(ROUTE_BOUNDS, FIT_OPTIONS);
    draw();
  }, [draw]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;
    let viewObserver: IntersectionObserver | null = null;

    const boot = async () => {
      const mod = await import("leaflet");
      const L = (mod as unknown as { default?: typeof import("leaflet") }).default ?? mod;
      if (disposed || !hostRef.current) return;

      const map = L.map(hostRef.current, {
        center: [-25.4438, -49.2931],
        zoom: 13.5,
        zoomSnap: 0,
        zoomDelta: 0,
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        boxZoom: false,
        preferCanvas: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        // attribution própria, fora do canto do mapa (ver .econtrol-map-credit)
        attribution: "",
        crossOrigin: true,
      }).addTo(map);

      map.on("resize", draw);
      refit();

      resizeObserver = new ResizeObserver(refit);
      resizeObserver.observe(hostRef.current);
    };

    // só busca os tiles quando a section se aproxima da viewport
    if (typeof IntersectionObserver === "undefined") {
      void boot();
    } else {
      viewObserver = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          viewObserver?.disconnect();
          viewObserver = null;
          void boot();
        },
        { rootMargin: "240px" }
      );
      viewObserver.observe(host);
    }

    return () => {
      disposed = true;
      viewObserver?.disconnect();
      resizeObserver?.disconnect();
      mapRef.current?.off("resize", draw);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [draw, refit]);

  return (
    <div className="econtrol-map" ref={wrapRef}>
      <svg className="econtrol-map-fallback" viewBox="0 0 520 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="520" height="330" fill="#f1f3f4" />
        <path d="M0 246 C92 232 128 268 208 258 S332 214 420 236 520 268 520 268 L520 330 L0 330 Z" fill="#e4e8ea" />
        <path d="M-10 300 C80 286 150 314 250 300 S430 268 540 292" fill="none" stroke="#dde3e6" strokeWidth="16" />
        <rect x="44" y="52" width="126" height="84" rx="6" fill="#e6e9ea" />
        <rect x="330" y="34" width="146" height="76" rx="6" fill="#e6e9ea" />
        <g stroke="#ffffff" strokeWidth="9" strokeLinecap="round">
          <path d="M0 46 H520" /><path d="M0 152 H520" /><path d="M0 212 H520" />
          <path d="M78 0 V330" /><path d="M196 0 V330" /><path d="M318 0 V330" /><path d="M436 0 V330" />
        </g>
        <g stroke="#f6f7f7" strokeWidth="4" strokeLinecap="round">
          <path d="M0 96 H520" /><path d="M0 264 H520" /><path d="M138 0 V330" /><path d="M258 0 V330" /><path d="M378 0 V330" />
        </g>
        <g fill="#e9ebec">
          <rect x="92" y="166" width="44" height="34" rx="3" />
          <rect x="212" y="166" width="44" height="34" rx="3" />
          <rect x="334" y="122" width="44" height="22" rx="3" />
          <rect x="452" y="166" width="44" height="34" rx="3" />
        </g>
      </svg>

      <div className="econtrol-map-canvas" ref={hostRef} />

      <svg className="econtrol-route-line" ref={svgRef} aria-hidden="true">
        <path className="econtrol-route-casing" ref={casingRef} />
        <path className="econtrol-route-path" ref={lineRef} />
        <circle className="econtrol-route-pulse" ref={pulseRef} r="7" />
      </svg>

      <span className="econtrol-route-marker marker-origin" ref={originRef} aria-hidden="true">
        <IconTruck />
      </span>
      <span className="econtrol-route-marker marker-destination" ref={destRef} aria-hidden="true">
        <IconPin />
      </span>
      <span className="econtrol-stop stop-one" ref={stopOneRef} aria-hidden="true">
        <i /> CENTRO
      </span>
      <span className="econtrol-stop stop-two" ref={stopTwoRef} aria-hidden="true">
        <i /> ENTREGA
      </span>

      <span className="econtrol-map-credit" aria-hidden="true">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" tabIndex={-1}>
          © OpenStreetMap
        </a>
      </span>
    </div>
  );
}
