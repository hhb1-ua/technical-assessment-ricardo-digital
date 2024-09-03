import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { User } from '../types/User';
import { InputNumber } from 'primereact/inputnumber';
import { Company } from '../types/Company';

export interface UserInputProps {
  companies: Company[];
  addUser(user: User): void;
  modifyUser(user: User): void;
  onSubmit(): void;
}

export const UserInput = ({
  companies,
  addUser,
  modifyUser,
  onSubmit,
}: UserInputProps) => {
  const [input, setInput] = useState({});
  const [selected, setSelected] = useState(null);

  const onClick = () => {
    if (input.id) {
      modifyUser(input as User);
    } else {
      const parsedInput = {
        dni: input.dni,
        name: input.name,
        email: input.email,
        birthday: input.birthday,
        company_id: input.company_id,
      };
      addUser(parsedInput as Omit<User, 'id'>);
    }
    onSubmit();
  };

  return (
    <div className="user-input">
      <InputNumber
        placeholder="ID (Empty to insert)"
        onChange={(e) => setInput({ ...input, id: e.value })}
      />
      <InputText
        placeholder="DNI"
        value={input.dni ?? ''}
        onChange={(e) => setInput({ ...input, dni: e.target.value })}
      />
      <InputText
        placeholder="Full name"
        value={input.name ?? ''}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <InputText
        placeholder="Email"
        value={input.email ?? ''}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      />
      <InputText
        placeholder="Birthday"
        value={input.birthday ?? ''}
        onChange={(e) => setInput({ ...input, birthday: e.target.value })}
      />
      <Dropdown
        placeholder="Company"
        options={companies}
        optionLabel="name"
        optionValue="id"
        onChange={(e) => {
          setSelected(e.value);
          setInput({ ...input, company_id: e.value });
        }}
        value={selected}
      />
      <Button label="Append" onClick={onClick} />
    </div>
  );
};
