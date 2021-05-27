// packages
import { useState } from "react";
import { useRouter } from "next/router";
import { ExclamationIcon } from "@heroicons/react/outline";
// components
import SiteLayout from "@components/layouts/site";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Modal from "@components/ui/modal";
import BasePanel from "@components/base-panel";
// hooks
import useDisclosure from "@hooks/use-disclosure";
// helpers
import { deleteSite } from "@/services/firestore";
// types
import type { FormEvent } from "react";
import type { SiteData, PageProps } from "@/types";

export default function Advanced({ data }: PageProps<SiteData>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmInputState, setConfirmInput] = useState<string>("");
  const [errorState, setErrorState] = useState<string | null>(null);
  const [loadingState, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const isValid = confirmInputState === data.name;

  const handleSiteDeleteAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid) {
      setLoading(true);
      await deleteSite(data.id);

      await router.replace("/dashboard");
      setLoading(false);
    } else {
      setErrorState("Please type the correct site name!");
    }
  };

  const handleModalClose = () => {
    setConfirmInput("");
    setErrorState(null);
    onClose();
  };

  return (
    <BasePanel
      title="Site security"
      subTitle="Data can not be recovered once a site is deleted so please be certain before taking this action."
    >
      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-500 pb-3">Warning</span>
          <p className="text-sm text-gray-800">This action cannot be undone.</p>
        </div>

        <div className="mt-1 sm:mt-0 sm:col-span-2 flex items-center justify-center">
          <Button variant="dangerOutlined" size="normal" onClick={onOpen}>
            Delete site and all it's data
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <form onSubmit={handleSiteDeleteAction}>
          <div className="py-5 sm:py-6 bg-yellow-100 border-t border-b-2 border-yellow-300 text-yellow-700 flex flex-col items-center">
            <ExclamationIcon className="w-20 mb-1" />
            <p className="px-4 sm:px-6">
              This action will <strong>permanently</strong> delete all your site data, including any
              existing routes and feedback. There is no possible way of getting your site back. Upon
              confirmation of this action
              <strong> the site and all it's data will be deleted</strong> and you will be
              redirected to the dashboard.
            </p>
          </div>

          <div className="px-4 pb-5 pt-10 sm:px-6 sm:pb-6">
            <label htmlFor="confirm" className="block text-gray-600 pl-0.5 mb-2">
              Please type <strong>{data.name}</strong> to confirm.
            </label>

            <Input
              id="confirm"
              isError={!!errorState}
              error={errorState}
              onChange={({ target }) => setConfirmInput(target.value)}
            />

            <Button
              type="submit"
              variant="danger"
              size="fullSmall"
              disabled={!isValid}
              aria-disabled={!isValid}
              loading={loadingState}
              className="mt-4"
            >
              I understand, delete my site
            </Button>
          </div>
        </form>
      </Modal>
    </BasePanel>
  );
}

Advanced.Layout = SiteLayout;
