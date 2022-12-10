import { useEffect } from "react";

  
export default function GoToTop() {
  
  const onTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    onTop()
  }, []);
  
  return null;
}