import { useState, useEffect, useRef } from "react";

const Ellipses = ({ text, maxChars }) => {
  const labelRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (labelRef.current) {
      setIsTruncated(text.length > maxChars);
    }
  }, [text, maxChars]);

  return (
    <span
      ref={labelRef}
      className="ellipsis-label-text"
      title={isTruncated ? text : undefined}
    >
      {isTruncated ? `${text.slice(0, maxChars)}…` : text}
    </span>
  );
};

export default Ellipses;
