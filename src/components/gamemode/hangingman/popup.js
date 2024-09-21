const Popup = ({ status, word, reset }) => {
  if (!status) return;

  return (
    <div className="popup">
      <p>You {status}!</p>
      <p>The word was : {word}</p>
      <button onClick={reset}>Play Again ?</button>
    </div>
  );
};

export default Popup;
