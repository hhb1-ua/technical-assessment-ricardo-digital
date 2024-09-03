import { useState } from "react";
import { Company } from "../types/Company";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface CompanyInputProps {
  addCompany(company: Company): void,
  modifyCompany(company: Company): void,
  onSubmit(): void
}

export const CompanyInput = ({ addCompany, modifyCompany, onSubmit }: CompanyInputProps) => {
  const [input, setInput] = useState({});

  const onClick = () => {
    if (input.id) {
      modifyCompany(input as Company);
    } else {
      const parsedInput = {
        cif: input.cif,
        name: input.name,
        sector: input.sector,
        address: input.address
      }

      addCompany(parsedInput as Omit<Company, 'id'>);
    }
    onSubmit();
  }

  return (
    <div className="user-input">
      <InputNumber 
        placeholder="ID (Empty to insert)" 
        onChange={(e) => setInput({ ...input, id: e.value })} 
      />
      <InputText 
        placeholder="CIF" 
        value={input.cif ?? ''} 
        onChange={(e) => setInput({ ...input, cif: e.target.value })}
      />
      <InputText 
        placeholder="Name" 
        value={input.name ?? ''}
        onChange={(e) => setInput({ ...input, name: e.target.value })} 
      />
      <InputText 
        placeholder="Sector" 
        value={input.sector ?? ''}
        onChange={(e) => setInput({ ...input, sector: e.target.value })} 
      />
      <InputText 
        placeholder="Address" 
        value={input.address ?? ''}
        onChange={(e) => setInput({ ...input, address: e.target.value })} 
      />
      <Button label="Append" onClick={onClick} />
    </div>
  );
};
