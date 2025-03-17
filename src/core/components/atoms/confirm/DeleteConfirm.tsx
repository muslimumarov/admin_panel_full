import { Button, Modal } from "flowbite-react";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";

interface DeleteConfirmProps {
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const DeleteConfirm = ({
  title,
  description,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Trash2
        size={18}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className={"cursor-pointer"}
      />
      <Modal size={"sm"} show={open} onClose={() => setOpen(false)}>
        <Modal.Header className={"p-3"}>
          <div className="pointer-events-none flex items-center gap-3 text-red-600">
            <Button size={"sm"} color={"light"}>
              <Trash2 className={"text-red-600"} />
            </Button>{" "}
            {title || t("delete")}
          </div>
        </Modal.Header>
        <Modal.Body className={"p-3 dark:text-white"}>
          {description || t("deleteDesc")}
        </Modal.Body>
        <Modal.Footer className={"justify-end p-3"}>
          <Button
            size={"sm"}
            color={"gray"}
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              setOpen(false);
            }}
          >
            {t("No")}
          </Button>
          <Button
            size={"sm"}
            color={"failure"}
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              setOpen(false);
            }}
          >
            {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirm;
