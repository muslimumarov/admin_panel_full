import { Button, Modal } from "flowbite-react";
import { MyHtmlEditor } from "../../../core/components/atoms/form";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { useModalForm } from "../hooks/useModalForm.ts";

interface CommentModalProps {
  id: Url | null;
  handleClose: () => void;
}

export const CommentModal = ({ id, handleClose }: CommentModalProps) => {
  const { isOpen, handleSubmit, onSubmit, control, errors, t } = useModalForm(
    id,
    handleClose,
  );

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <Modal.Header>{t("Buyurtma tafsilotlari")}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyHtmlEditor
            required
            error={errors.comment?.message}
            label={t("Izoh")}
            control={control}
            name="comment"
          />
          <div className="mt-3 flex justify-end gap-3">
            <Button type="submit" color="blue">
              {t("Saqlash")}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
