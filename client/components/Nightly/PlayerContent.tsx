import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { MediaItem } from "./MediaItem";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState, useRef } from "react";

interface PlayerContentProps {
    song: any;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }
        player.setId(nextSong)
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }
        player.setId(previousSong)
    }

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
            if (audioRef.current) {
                audioRef.current.volume = 1;
            }
        } else {
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        }
    }
    const handleSeek = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} onClick={() => {}}/>
                </div>
            </div>

            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div className="block">
            
                <div className="hidden h-[50%] md:flex justify-center items-center w-full max-w-[722px] gap-x-6 mt-2">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={25}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick={handlePlay}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
                    >
                        <Icon size={30} className="text-black" />
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={25}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>
                <div className="flex items-center">
                    <p>{formatTime(currentTime)}</p>
                    <Slider
                        className="h-7 flex-grow mx-2"
                        min={0}
                        max={audioRef.current?.duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                    />
                    <p>{formatTime(audioRef.current?.duration || 0)}</p>
                </div>
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon size={34} className="cursor-pointer" onClick={toggleMute} />
                    <Slider
                    min={0}
                    max={1}
                        value={volume}
                        onChange={(value) => {setVolume(value); audioRef.current.volume = value; }}
                    />
                </div>
            </div>

            <audio
                ref={audioRef}
                src={songUrl}
                // Добавляем обработчик события для отслеживания времени воспроизведения
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            />
        </div>
    );
}

export default PlayerContent;
