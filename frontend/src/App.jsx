import { useEffect } from "react";
import "./App.css";
import { apiGetAllSkills, apiGetskill } from "./services/skills.services";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skills = await apiGetAllSkills();
        console.log(skills.data);
        const single = await apiGetskill("65f9b9128f5ab45efb7e8553");
        console.log(single.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Invoke the async function here
  }, []);

  return (
    <>
      <h1 className="text-center font-bold text-2xl text-red-800">
        Hello world
      </h1>
    </>
  );
}

export default App;
