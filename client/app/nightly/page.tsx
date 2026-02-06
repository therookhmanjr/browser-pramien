'use client'

import { Header } from "@/components/Nightly/Header";
import { ListItem } from "@/components/Nightly/ListItem";
import Sidebar from "@/components/Nightly/Sidebar";
import { PageContent } from "./components/PageContent";
import Player from "@/components/Nightly/Player";
import type { Metadata } from 'next'
import { useState } from "react";
import { UploadModal } from "@/components/Nightly/UploadModal";

export const revalidate = 0;



export default function Home() {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className="h-full bg-black">
      {showUpload && (
        <UploadModal hide={() => setShowUpload(false)}/>
      )}
      <Sidebar className="flex h-full text-white"
      hide={() => setShowUpload(true)}>
        <div className="
          bg-[#2b2a33]
          rounded-lg
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
        ">
          <Header>
            <div className="mb-2">
              <h1
                className="
                  text-white
                  text-3xl
                  font-semibold
                "
              >
                Welcome back!
              </h1>
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                  gap-3
                  mt-4
                "
              >
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="nightly/liked"
                />
              </div>
            </div>
          </Header>
          <div className="mt-2 mb-7 px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Newest Songs
              </h1>
            </div>
            <PageContent />
          </div>
        </div>
      </Sidebar>
      <Player />
    </div>
  );
}
