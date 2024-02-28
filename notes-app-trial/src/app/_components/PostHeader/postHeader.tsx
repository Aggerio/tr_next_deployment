import Link from "next/link";

export default function PostHeader({header}: {header: string})  {
  return (
    <h1 style={{marginBottom: "16px"}}>
        {header}
    </h1>
  );
};

