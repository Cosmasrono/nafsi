import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { studioBooking } from "@/lib/content";

export function StudioBooking() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="bg-cocoa-900 p-7 text-cream-50 sm:p-9">
        <p className="font-display text-2xl font-bold">Book {studioBooking.name}</p>
        <p className="mt-3 text-cream-50/80">{studioBooking.intro}</p>
        <ButtonLink href={studioBooking.url} variant="primary" className="mt-6">
          Check availability &amp; book
          <ArrowUpRight className="size-4" />
        </ButtonLink>
        <p className="mt-3 text-xs text-cream-50/60">Opens book.heygoldie.com in a new tab.</p>
      </div>

      <div className="p-7 sm:p-9">
        <h3 className="font-display text-lg font-bold text-cocoa-900">Services &amp; rates</h3>
        <ul className="mt-4 divide-y divide-sand-100">
          {studioBooking.services.map((service) => (
            <li key={service.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
              <div>
                <p className="font-semibold text-cocoa-900">{service.name}</p>
                <p className="text-sm text-muted">
                  {service.duration}
                  {service.note ? ` · ${service.note}` : ""}
                </p>
              </div>
              <p className="font-display font-bold text-mustard-600">{service.price}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 font-semibold text-cocoa-900">
              <Clock className="size-4 text-mustard-600" />
              Opening hours
            </p>
            <ul className="mt-2 space-y-1 text-sm text-cocoa-800">
              {studioBooking.hours.map((slot) => (
                <li key={slot.days} className="flex justify-between gap-4">
                  <span>{slot.days}</span>
                  <span className="text-muted">{slot.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 font-semibold text-cocoa-900">
              <MapPin className="size-4 text-mustard-600" />
              Where
            </p>
            <p className="mt-2 text-sm text-cocoa-800">{studioBooking.location}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-sand-100 p-5">
          <p className="text-sm font-semibold text-cocoa-900">Booking terms</p>
          <ul className="mt-2 space-y-1.5 text-sm text-cocoa-800">
            {studioBooking.terms.map((term) => (
              <li key={term} className="flex gap-2">
                <span aria-hidden className="text-mustard-600">
                  •
                </span>
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
