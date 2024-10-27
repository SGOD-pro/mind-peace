import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface DynamicModalProps {
	active: CardProps | null | boolean;
	onClose: () => void;
	id: string;
}

const ExpandableCard: React.FC<DynamicModalProps> = ({
	active,
	onClose,
	id,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, onClose);

	if (!active) return null;

	return (
		<>
			<AnimatePresence>
				{active && typeof active === "object" && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
						}}
						className="fixed inset-0 bg-black/20 h-full w-full z-20"
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
  {active && typeof active === "object" ? (
    <div className="fixed inset-0 grid place-items-center z-[100]">
      <motion.button
        key={`button-${active.title}-${id}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.05 },
        }}
        className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
        onClick={onClose}
      >
        <CloseIcon />
      </motion.button>

      <motion.div
        layoutId={`card-${active.title}-${id}`}
        ref={ref}
        className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col sm:rounded-3xl overflow-hidden bg-slate-100 relative z-[10000]"
        style={{ zIndex: 10000, position: "relative" }}
      >
        <motion.div
          layoutId={`image-${active.title}-${id}`}
          className="w-full h-80 relative"
        >
          <Image
            priority
            width={200}
            height={200}
            src={active.src}
            alt={active.title}
            className="w-full h-full sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
          />
        </motion.div>

        <div
          className="h-[calc(100%-20rem)] overflow-auto rounded-t-2xl scrollbar"
          data-scroll-container
          onWheel={(e) => e.stopPropagation()} // Stop event from bubbling up to Locomotive Scroll
        >
          <div className="flex justify-between items-start p-4">
            <div>
              <motion.h3
                layoutId={`title-${active.title}-${id}`}
                className="text-neutral-700 dark:text-neutral-200 font-semibold text-lg"
              >
                {active.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${active.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-bas"
              >
                {active.description}
              </motion.p>
            </div>
          </div>
          <div className="pt-4 relative px-4">
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
              onWheel={(e) => e.stopPropagation()} // Ensure independent scroll area
            >
              <div className="h-full w-full">
                {typeof active.content === "function"
                  ? active.content()
                  : active.content}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : null}
</AnimatePresence>

		</>
	);
};

const CloseIcon = () => (
	<motion.svg
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0, transition: { duration: 0.05 } }}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-4 w-4 text-black"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M18 6l-12 12" />
		<path d="M6 6l12 12" />
	</motion.svg>
);
export default ExpandableCard;
