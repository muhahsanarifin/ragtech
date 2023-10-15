import {useState, useEffect} from "react"

const Title = ({ onTitle, children }) => {
  const [title, setTitle] = useState(onTitle);

  useEffect(() => {
    setTitle(onTitle);
  }, [onTitle]);

  document.getElementById("title").innerHTML = title;

  return children;
};

export default Title