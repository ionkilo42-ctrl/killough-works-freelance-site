type SuccessStateProps = {
  title: string;
  message: string;
  resetLabel?: string;
  onReset: () => void;
};

export function SuccessState({
  title,
  message,
  resetLabel = "Reset demo",
  onReset,
}: SuccessStateProps) {
  return (
    <div className="demo-success-state" role="status" aria-live="polite">
      <p className="panel-label">Demo success state</p>
      <h3>{title}</h3>
      <p>{message}</p>
      <button className="button secondary demo-reset-button" type="button" onClick={onReset}>
        {resetLabel}
      </button>
    </div>
  );
}

