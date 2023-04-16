import { useState } from "react";
import { generateChatCompletion } from "../../services/ChatApi";

function ChatBox() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (inputText === "") {
      setOutputText("Não pode ser vazio. Digite algo por favor...");
      setIsLoading(false);
    } else {
      const completion = await generateChatCompletion(inputText);
      setOutputText(completion);
      setInputText("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-box">
        <form className="chat-boxform" onSubmit={handleSubmit}>
          <label htmlFor="prompt" className="chat-box-label">Desabafe, ou conte pelo o que você tem passado:</label>
          <textarea id="prompt" className="chat-box-input" value={inputText} onChange={(event) => setInputText(event.target.value)} />
          <button type="submit" className="chat-box-button">Enviar</button>
        </form>
        <div>
          {isLoading === true ? <p className="loader"></p> : outputText && (
            <div className="response">
              <h2 className="response-heading">Sua resposta:</h2>
              <p className="response-text">{outputText}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBox;