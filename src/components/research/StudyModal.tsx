import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Study } from '../../types';
import { StudyDetails } from './StudyDetails';

interface StudyModalProps {
  study: Study | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudyModal({ study, isOpen, onClose }: StudyModalProps) {
  if (!study) return null;

  const shareUrl = `${window.location.origin}/study/${study.id}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full p-2 transition-all duration-200 text-white hover:scale-105"
            >
              <X size={20} />
            </button>

            <StudyDetails study={study} shareUrl={shareUrl} />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
