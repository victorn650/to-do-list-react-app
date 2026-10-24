import { collectDefaultMetrics, Counter, Histogram, Registry } from "@prometheus-io/client"
import type { RequestHandler } from "express"

export const metricsRegistry = new Registry()

collectDefaultMetrics({ register: metricsRegistry, prefix: "todo_backend_" })

const httpRequests = new Counter({
  name: "todo_backend_http_requests_total",
  help: "Total HTTP requests handled by the todo backend.",
  labelNames: ["method", "route", "status_code"] as const,
  registers: [metricsRegistry],
})

const httpRequestDuration = new Histogram({
  name: "todo_backend_http_request_duration_seconds",
  help: "Duration of HTTP requests handled by the todo backend in seconds.",
  labelNames: ["method", "route", "status_code"] as const,
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [metricsRegistry],
})

export const recordHttpMetrics: RequestHandler = (req, res, next) => {
  if (req.path === "/metrics") {
    next()
    return
  }

  const start = process.hrtime.bigint()

  res.once("finish", () => {
    // Express sets req.route after it matches a route. The pattern keeps todo IDs
    // out of metric labels, so each new todo does not create a new time series.
    const route = req.route ? `${req.baseUrl}${String(req.route.path)}` : "unmatched"
    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    }
    const durationSeconds = Number(process.hrtime.bigint() - start) / 1e9

    httpRequests.inc(labels)
    httpRequestDuration.observe(labels, durationSeconds)
  })

  next()
}
