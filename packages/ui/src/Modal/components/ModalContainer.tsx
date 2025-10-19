import { useModalStore } from "@repo/hooks";
import { v4 as uuidv4 } from "uuid";

function ModalContainer() {
  const modals = useModalStore(state => state.modals);

  return (
    <>
      {modals.map(modal => {
        const { Component, props } = modal;
        return (
          <div key={uuidv4()} className="modal">
            <Component {...props} />
          </div>
        );
      })}
    </>
  );
}

export default ModalContainer;
