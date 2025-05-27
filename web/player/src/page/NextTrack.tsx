import { onMount, Show } from "solid-js";
import { airstationAPI } from "../api";
import styles from "./NextTrack.module.css";
import { addEventListener, EVENTS } from "../store/events";
import { setTrackStore, trackStore } from "../store/track";

export const NextTrack = () => {
    onMount(async () => {
        try {
            const cs = await airstationAPI.getPlayback();
            if (cs.isPlaying && cs.nextTrack) setTrackStore("nextTrackName", cs.nextTrack.name);
        } catch (error) {
            console.log(error);
        }

        addEventListener(EVENTS.newTrack, async () => {
            try {
                const cs = await airstationAPI.getPlayback();
                if (cs.isPlaying && cs.nextTrack) setTrackStore("nextTrackName", cs.nextTrack.name);
            } catch (error) {
                console.log(error);
            }
        });
    });

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(trackStore.nextTrackName);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div class={styles.box}>
            <Show when={trackStore.nextTrackName.length > 0}>
                <div class={styles.label}>
                    <u>UP NEXT</u>
                </div>
                <div onClick={copyToClipboard} class={styles.label}>
                    {trackStore.nextTrackName}
                </div>
            </Show>
        </div>
    );
};
