export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <div className="space-y-1">
          <p className="text-base font-semibold">در حال بارگذاری...</p>
          <p className="text-sm text-muted-foreground">لطفاً چند لحظه صبر کنید.</p>
        </div>
      </div>
    </div>
  );
}
