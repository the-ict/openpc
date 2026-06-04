import { Modal, ModalContent } from '@/src/shared/ui/dialog';

interface Props {
    id: number;
};

export default function SpecInfo({id}: Props) {
    return (
        <Modal>
            <ModalContent>
                <h2 className="text-lg font-bold mb-4">Component Specs</h2>
                <p className="text-sm text-slate-300">Here you can display detailed specifications for the selected component with ID: {id}.</p>
            </ModalContent>
        </Modal>
    )
};