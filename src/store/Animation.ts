import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { persist } from 'zustand/middleware'

interface AnimationState {
    landingAnimation: boolean;
    navbarLinks: boolean;
    setLandingAnimation: (isOpen: boolean) => void;
    setIsNavbarLinks: (isOpen: boolean) => void;
}

export const useAnimationStore = create<AnimationState>()(
    // persist(
        immer((set) => ({
            landingAnimation: false,
            navbarLinks:false,
            setLandingAnimation: (isOpen) => {
                set((state) => {
                    state.landingAnimation = isOpen;
                });
            },
            setIsNavbarLinks: (isOpen) => {
                set((state) => {
                    state.navbarLinks = isOpen;
                });
            },
        })),
    //     {
    //         name: "animation",
    //     }
    // )
)

export const animationStore=useAnimationStore.getState();