import Button from '@components/ui/button/button.component';
import Input from '@components/ui/input/input.component';
import Modal from '@components/ui/modal/modal.component';
import Textarea from '@components/ui/textarea/textarea.component';
import type { ContactModel } from '@interfaces/contact.interface';
import { editContactAtom, fetchContactAtom, postContactAtom } from '@states/contact.state';
import { useAtom } from 'jotai';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import toast from 'react-hot-toast';

import style from './contact-form.module.scss';

interface FuncProps {
  open: () => void;
  close: () => void;
}

interface IProps {
  title: string;
  record?: ContactModel;
}

const ContactForm: React.ForwardRefRenderFunction<FuncProps, IProps> = ({ title, record }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [{ mutate: submitAct, status: submitStatus, error: submitError, isPending: submitLoading }] =
    useAtom(postContactAtom);
  const [{ mutate: editAct, status: editStatus, error: editError, isPending: editLoading }] = useAtom(editContactAtom);
  const [{ refetch }] = useAtom(fetchContactAtom);

  const [formData, setFormData] = useState<Partial<ContactModel>>({
    first_name: '',
    last_name: '',
    job: '',
    description: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>();

  useEffect(() => {
    if (record) {
      setFormData(record);
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        job: '',
        description: '',
      });
    }
  }, [record]);

  useEffect(() => {
    if (submitStatus === 'success') {
      refetch();
      toast.success(`New Contact created successfully!`, { id: 'create-new' });

      setIsOpen(false);
    }

    if (submitError) {
      toast.error(`New Contact created failed!`, { id: 'create-new-failed' });
    }
  }, [submitStatus, submitError]);

  useEffect(() => {
    if (editStatus === 'success') {
      refetch();
      toast.success(`Contact updated successfully!`, { id: 'update-new' });

      setIsOpen(false);
    }

    if (editError) {
      toast.error(`Contact updated failed!`, { id: 'updated-new' });
    }
  }, [editStatus, editError]);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'first_name':
        if (!value) {
          error = 'First Name is required';
        }

        break;
      case 'last_name':
        if (!value) {
          error = 'Last Name is required';
        }

        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors: { [key: string]: string } = {};

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const field in formData) {
      const error = validateField(field, (formData as any)[field]);
      if (error) {
        validationErrors[field] = error;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    // Handle form submission here (e.g., send data to server)
    if (record && record.id) {
      await editAct({ id: record.id, ...formData });
    } else {
      await submitAct(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} title={title} onClose={() => setIsOpen(false)}>
      <form className={style.form} onSubmit={handleSubmit} noValidate>
        <div className={style.section}>
          <Input
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleChange}
            error={errors?.first_name}
            required
          />
          <Input
            name="last_name"
            label="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            error={errors?.last_name}
            required
          />
        </div>
        <div className={style.section}>
          <Input name="job" label="Job" value={formData.job} onChange={handleChange} error={errors?.job} />
        </div>
        <div className={style.section}>
          <Textarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            error={errors?.description}
          />
        </div>

        <div className={style.actions}>
          <Button disabled={submitLoading || editLoading} color="ghost" label="Cancel" onClick={() => setIsOpen(false)} />
          <Button type="submit" color="primary" label="Save" isLoading={submitLoading || editLoading} />
        </div>
      </form>
    </Modal>
  );
};

export default forwardRef(ContactForm);
