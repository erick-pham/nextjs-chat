import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@src/lib/supabase";
import Head from "next/head";

const MessagePage = () => {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.push("/sign-in");
      } else {
        router.push("/messages/1");
      }
      setUserLoaded(session ? true : false);
    });

    const onAuthStateChange = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUserLoaded(!!session?.user);
        router.push("/messages/1");
      }
    );

    return () => {
      onAuthStateChange.data.subscription.unsubscribe();
    };
  }, []);

  if (!userLoaded) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Messenger - NextJS</title>
      </Head>
    </>
  );
};

export default MessagePage;
