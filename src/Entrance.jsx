/** Users can enter their name to receive a token from the API. */
import { useAuth } from "./AuthContext"
import { useState } from "react";



export default function Entrance() {
  const { signup } = useAuth()
  const [signupName, setSignupName] = useState("");

  const stopFailing = (e) => {
    e.preventDefault();
    console.log("Submitting name:", signupName);
    signup(signupName);
  }

  //render 
  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form onSubmit={stopFailing}>
        <label>
          Name
          <input name="name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
        </label>
        <button type="submit">Respond</button>
      </form>
    </>
  );
}
