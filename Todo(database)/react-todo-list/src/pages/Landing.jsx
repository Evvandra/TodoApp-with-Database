import { Link } from "react-router-dom";
import '../App.css';


export default function Landing() {
  return (
    <div className="item-center w-full bg-white shadow-xl flex-col justify-center p-10 rounded-lg mt-28">
      <div className="mb-12">
        <h1 className="text-black text-2xl font-bold text-center uppercase tracking-[.2em] mb-8 leading-loose">Hello, welcome to your Todo List App
        <br /> 
        This is Evandra (2602118433)
        </h1>
      </div>


      <Link to="/todo">
        <div className="flex justify-center ">
          <button className=" btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to your Todo List →
          </button>
        </div>   
      </Link>
    </div>
  );
}
