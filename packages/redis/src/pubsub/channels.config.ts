
/**
 * Global channel registry — single source of truth for every Pub/Sub
 * channel name used across all microservices.
 *
 * Naming convention:  <domain>:<event>
 * All names are lowercase, colon-separated, present-tense past-event.
 */
export const CHANNELS = {

    // ── User Service ───────────────────────────────────────────────────────
    USER_CREATED:         "user:created",
    USER_UPDATED:         "user:updated",
    USER_DELETED:         "user:deleted",
    USER_PASSWORD_RESET:  "user:password-reset",

    // ── Order Service ──────────────────────────────────────────────────────
    ORDER_PLACED:         "order:placed",
    ORDER_CONFIRMED:      "order:confirmed",
    ORDER_CANCELLED:      "order:cancelled",
    ORDER_STATUS_CHANGED: "order:status-changed",

    // ── Payment Service ────────────────────────────────────────────────────
    PAYMENT_INITIATED:    "payment:initiated",
    PAYMENT_SUCCESS:      "payment:success",
    PAYMENT_FAILED:       "payment:failed",
    PAYMENT_REFUNDED:     "payment:refunded",

    // ── Notification Service ───────────────────────────────────────────────
    NOTIFICATION_SEND:    "notification:send",
    NOTIFICATION_READ:    "notification:read",

    // ── Cache ──────────────────────────────────────────────────────────────
    CACHE_INVALIDATE:     "cache:invalidate",
    CACHE_INVALIDATE_ALL: "cache:invalidate-all",

} as const;

export type Channel = (typeof CHANNELS)[keyof typeof CHANNELS];