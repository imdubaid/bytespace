import Stack from "@mui/material/Stack";
import Image from "next/image";

export default function Home() {
  return (
   <Stack alignItems="center" justifyContent="center" height="100vh"  >
     <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={200}
          height={40}
          priority
        />
   </Stack>
  );
}
