import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore, addMessage, supabase } from "@src/lib/supabase";
import { User } from "@supabase/supabase-js";
import Head from "next/head";
import { styled } from "@mui/material/styles";
import Conversation from "@src/components/Messages/Conversation";
import MessageTextbox from "@src/components/Messages/MessageTextbox";
import NavBar from "@src/components/Messages/NavBar";
import Sidebar from "@src/components/Messages/SideBar";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  // display: "flex",
  // flex: "1 1 auto",
  // maxWidth: "100%",
  paddingTop: 64,
  // backgroundColor: "red",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const MessageChannelPage = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [userLoaded, setUserLoaded] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { channelId } = router.query;
  const { messages, channels } = useStore({ channelId: Number(channelId) });

  useEffect(() => {
    if (!channels.some((channel) => String(channel.id) === String(channelId))) {
      router.push("/messages/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, channelId]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.push("/sign-in");
      }
      setUserLoaded(session ? true : false);
      setCurrentUser(session?.user ?? null);
    });

    const onAuthStateChange = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setCurrentUser(session?.user ?? null);
        setUserLoaded(!!session?.user);
      }
    );

    return () => {
      onAuthStateChange.data.subscription.unsubscribe();
    };
  }, []);

  if (!userLoaded) {
    return <></>;
  }

  const handleSendMessage = async (msg: string) => {
    await addMessage(msg, Number(channelId), String(currentUser?.id));
  };

  return (
    <>
      <Head>
        <title>Messenger - NextJS</title>
      </Head>
      <NavBar onSidebarOpen={() => setSidebarOpen(true)} />
      <MainLayoutRoot>
        <Conversation
          messages={messages}
          currentUser={currentUser}
        ></Conversation>
        <MessageTextbox onSendMessage={handleSendMessage}></MessageTextbox>
      </MainLayoutRoot>
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        channels={channels}
        activeChannelId={String(channelId)}
      />
    </>
  );
};

export default MessageChannelPage;
