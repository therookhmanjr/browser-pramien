import usePlayer from "./usePlayer";


const useOnPlay = (songs: any[]) => {
    const player = usePlayer();
    const onPlay = (id: string) => {
        player.setId(id);
        player.setIds(songs.map((song) => song.id))
    }

    return onPlay;
};

export default useOnPlay;