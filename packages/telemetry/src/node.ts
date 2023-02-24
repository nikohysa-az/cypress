import { Telemetry as TelemetryClass, TelemetryNoop } from './index'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { envDetector, processDetector, osDetector, hostDetector } from '@opentelemetry/resources'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'

let telemetryInstance: TelemetryNoop | TelemetryClass = new TelemetryNoop

const init = async ({ namespace, context, version }: {namespace: string, context?: {traceparent: string}, version: string }) => {
  const key = process.env.CYPRESS_TELEMETRY_KEY

  if (!key) {
    return
  }

  telemetryInstance = await TelemetryClass.init({
    namespace,
    Provider: NodeTracerProvider,
    detectors: [
      envDetector, processDetector, osDetector, hostDetector,
    ],
    rootContextObject: context,
    version,
    key,
    SpanProcessor: BatchSpanProcessor,
  })

  return
}

export const telemetry = {
  init,
  startSpan: (arg: any) => telemetryInstance.startSpan(arg),
  getSpan: (arg: string) => telemetryInstance.getSpan(arg),
  getActiveContextObject: () => telemetryInstance.getActiveContextObject(),
  forceFlush: () => telemetryInstance.forceFlush(),
}
