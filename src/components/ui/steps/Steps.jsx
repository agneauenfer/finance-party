import Step from "./step"
import stepsData from "../../data/steps.json";
import "./step.css"


export default function Steps() {
  return (
        <div className="">
            {stepsData.map((step) => (
              <Step key={step.id} number={step.number} title={step.title} list={step.list} />
            ))}
        </div>    
  );
}
