export const genDeleteMsg = (text: string) => {
  return (
    <>
      This will permanently delete{" "}
      <i>
        <strong>{text}</strong>
      </i>{" "}
      and cannot be undone.
    </>
  );
};
