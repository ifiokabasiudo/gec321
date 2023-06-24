import react from "react"
import  Image  from "../node_modules/next/image";
import  Logo  from "../public/sky-logo.jpg"
import { useState } from "react"

export default function Home(req, res) {
    const [question, nextQuestion] = useState("");
    const [result, setResult] = useState();
    const [isLoading, setLoading] = useState(false);

    console.log(question);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const myFile = document.querySelector("input[type='file']");
        console.log(myFile);
        formData.append("file", myFile.files[0]);
    
        const response = 
        await fetch("http://localhost:4000/api/upload/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if(response.status === 200){
          const percentage1 = document.querySelector("#percentage");
          percentage1.innerText = data.percentage.toString();
        }else if(response.status === 500){
          alert(data.err.message);
          return;
        }else{
          alert(data.error || new Error(`Request failed with status ${response.status}`));
        }    
      }
      
      const onSubmit = async (error) => {
        error.preventDefault();
        setLoading(true);

        try {
          const response = await fetch("/api/api", {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({ question: question }),
          });

          const data = await response.json();
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }

          setResult(data.result);

          const myDiv1 = document.querySelector("#my-paragraph");
          myDiv1.innerText = data.result.toString();

          setLoading(false);

        }catch(error){
          console.error(error);
          alert(error.message);
          setLoading(false);
        } 
      }

    return (
        <main>
        <div className="body">
            <script type="module" src="C:\Users\ENGR. IFIOKABASI\Desktop\Ifiok's stuff\Coding\AI-prototype-1\backend\server.js\pdf2json.js"></script>
            {/* <h1>Upload your pdf for training</h1>
            <form>
                <label htmlFor="file" className="form-label">Choose file:</label><br/>
                <input type="file" id="file-upload" name="file-upload" className="form-control"></input>
                <button onClick={handleSubmit} className="btn btn-outline-primary q-button">Submit</button><br/>
            </form>
            <div id="percentage"></div> */}
            <div className="container q-form">
              <div className="row">
                <div className="col-lg-6">
                  <div className="lecture-mate">
                      <h3>Lecture_Mate_Prototype</h3>
                      <p>We trained the model for GEC321.  <br>imagine you had the power to do that yourselves? <br/> The possibilities are endless !!!</p>
                      <p>Join our community to provide feedback on the app in order to help us improve it to your satisfaction. Stay updated on our progress and challenges during development. Be expectant! Join us at: <a href="https://t.me/NEARCommunity/8/25">https://t.me/NEARCommunity/8/25</a></p>
                      <p>Ask your GEC321 questions!</p>  
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sky-waiters">
                    <h3><Image 
                      src={ Logo } 
                      width={50}
                      height={50}
                      alt="sky waiter"
                      className="sky-logo"
                      />Sky Waiters
                    </h3>
                    <p>Are you tired of waiting in long lines at cafe ? Or maybe you've had a long day and just want your food delivered for you in your room. You can sign up here to have waiters assigned to you: <a href="https://bit.ly/skywaitermembers">https://bit.ly/skywaitermembers</a></p>
                    <p>You're a student and want to make some extra cash on the side? You can click on the link to inquire on how to be a waiter: <a href="https://t.me/skywaiters">https://t.me/skywaiters</a></p>
                  </div>
                </div>
              </div>
              <div className="row">
                  <div className="col-12">
                      <div className="form">
                        <h3 className="query">Enter a question</h3>
                        <form>
                            <input type="text"
                            className="form-control"
                            placeholder="Ask away !"
                            id="query" 
                            name="query" 
                            value={question}
                            onChange={({target}) => nextQuestion(target?.value)}>
                            </input>
                            <button onClick={onSubmit} className="btn btn-outline-primary q-button">Submit</button>
                            {isLoading && <div className="loader">Processing...</div>}
                        </form>
                        <p id="my-paragraph"></p>
                    </div>
                  </div>
              </div>
            </div>
        </div>
 
        </main>
   );
}
