"use client";

import Script from "next/script";
import { useRef, useState } from "react";

const hostedButtonId = "NDG9RFXNW7LGC";
const containerId = `paypal-container-${hostedButtonId}`;
const sdkUrl = "https://www.paypal.com/sdk/js?client-id=BAAbevF2TtadAUoIaFIBNWJNEEV8-TULWxVtCki7sc1DDfSbLHzzHLjrzTVS5FXIlZietSPYfhrSggJZ8E&components=hosted-buttons&disable-funding=venmo&currency=EUR";

type PayPalWindow = Window & {
  paypal?: {
    HostedButtons: (options: { hostedButtonId: string }) => {
      render: (selector: string) => Promise<void>;
    };
  };
};

export function PayPalDonate() {
  const rendered = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function renderButton() {
    if (rendered.current) return;
    const paypal = (window as PayPalWindow).paypal;
    if (!paypal?.HostedButtons) {
      setStatus("error");
      return;
    }
    rendered.current = true;
    try {
      await paypal.HostedButtons({ hostedButtonId }).render(`#${containerId}`);
      setStatus("ready");
    } catch {
      rendered.current = false;
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="paypal-donate-heading" className="rounded-3xl border border-sand-200 bg-white p-6 shadow-xl shadow-cocoa-900/5 sm:p-8">
      <h2 id="paypal-donate-heading" className="font-display text-2xl font-bold text-cocoa-900">Give with PayPal</h2>
      <p className="mb-6 mt-3 text-sm leading-relaxed text-muted">Donate in euros (EUR) using PayPal. Choose your donation amount in the PayPal checkout below.</p>
      <Script id="paypal-hosted-buttons-sdk" src={sdkUrl} onReady={() => { void renderButton(); }} onError={() => setStatus("error")} />
      {status !== "ready" && (
        <p role="status" className="mb-4 text-sm text-muted">
          {status === "error" ? "PayPal could not load here. You can continue on PayPal using the link below." : "Loading PayPal checkout…"}
        </p>
      )}
      <div id={containerId} className="min-w-0" />
      <a href={`https://www.paypal.com/ncp/payment/${hostedButtonId}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-semibold text-cocoa-900 underline underline-offset-4">
        Open checkout on PayPal
      </a>
    </section>
  );
}
