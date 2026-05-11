"use client"

import type React from "react"

import { useState } from "react"

export function ReservationSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="reservar"
      className="bg-background py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Reservas
          </span>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            Reserva tu mesa frente al mar.
          </h2>
          <p className="max-w-md font-light leading-relaxed text-muted-foreground text-pretty">
            Solo 14 mesas. Cocina abierta hasta las 23:00. Te confirmaremos por
            correo en menos de dos horas.
          </p>

          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-8 font-light text-foreground">
            <p>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Dirección ·{" "}
              </span>
              Av. del Faro 1820, Caleta Marina
            </p>
            <p>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Teléfono ·{" "}
              </span>
              +56 2 2987 6543
            </p>
            <p>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Restaurante ·{" "}
              </span>
              Mar a Dom · 12:30 — 23:00
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 border border-border bg-secondary p-10">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Solicitud recibida
              </span>
              <h3 className="font-serif text-3xl font-light leading-tight md:text-4xl">
                Gracias. Te escribimos pronto.
              </h3>
              <p className="font-light text-muted-foreground">
                Hemos recibido tu solicitud de reserva. Revisaremos
                disponibilidad y te confirmaremos por correo electrónico.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm font-light underline underline-offset-4"
              >
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-2"
            >
              <FormField label="Nombre" name="name" type="text" required />
              <FormField
                label="Correo electrónico"
                name="email"
                type="email"
                required
              />
              <FormField label="Fecha" name="date" type="date" required />
              <FormField label="Hora" name="time" type="time" required />
              <div className="bg-background p-5 md:col-span-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Comensales
                  </span>
                  <select
                    name="people"
                    required
                    defaultValue="2"
                    className="border-b border-border bg-transparent py-2 font-serif text-xl outline-none focus:border-foreground"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "persona" : "personas"}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="bg-background p-5 md:col-span-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Notas (opcional)
                  </span>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Alergias, ocasión especial..."
                    className="resize-none border-b border-border bg-transparent py-2 font-light outline-none focus:border-foreground"
                  />
                </label>
              </div>
              <div className="flex items-center justify-end bg-background p-5 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-foreground px-8 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-foreground/90"
                >
                  Solicitar reserva
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div className="bg-background p-5">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
        <input
          name={name}
          type={type}
          required={required}
          className="border-b border-border bg-transparent py-2 font-serif text-xl outline-none focus:border-foreground"
        />
      </label>
    </div>
  )
}
