import { Controller } from "react-hook-form";

import Input from "common/components/input";
import Select from "common/components/select";
import MultiSelect from "common/components/multi-select";
import Button from "common/components/button";

import useLocations from "common/hooks/use-locations";

import { building, propertyStatus, propertyType } from "common/constants";

import { sortByName } from "common/utils";

const FieldRow = ({ label, hint, children }) => (
  <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="sm:w-48 sm:flex-shrink-0">
      <p className="text-sm font-medium text-slate-800">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
    <div className="flex-1 sm:max-w-[360px]">{children}</div>
  </div>
);

const CreateClientStep1 = ({ loading, clientId, control }) => {
  const { data: locations } = useLocations();

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h1 className="text-lg font-semibold text-slate-900">Detalji klijenta</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {clientId
            ? "Izmijenite podatke o klijentu"
            : "Unesite podatke o novom klijentu"}
        </p>
      </div>

      <div className="divide-y divide-slate-100 px-6">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FieldRow label="Ime" hint="Ime i prezime klijenta">
              <Input placeholder="Npr. Marko Marković" {...field} />
            </FieldRow>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <FieldRow label="Telefon" hint="Kontakt telefon">
              <Input placeholder="+387 61 000 000" type="tel" {...field} />
            </FieldRow>
          )}
        />

        <div className="py-3">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Preferencije nekretnine
          </p>
          <Controller
            name="minPrice"
            control={control}
            render={({ field }) => (
              <FieldRow label="Cijena od" hint="Minimalni budžet">
                <Input prefix="€" placeholder="0" type="number" {...field} />
              </FieldRow>
            )}
          />
          <Controller
            name="maxPrice"
            control={control}
            render={({ field }) => (
              <FieldRow label="Cijena do" hint="Maksimalni budžet">
                <Input prefix="€" placeholder="0" type="number" {...field} />
              </FieldRow>
            )}
          />
          <Controller
            name="locations"
            control={control}
            render={({ field }) => (
              <FieldRow label="Lokacije" hint="Željene lokacije">
                <MultiSelect
                  placeholder="Odaberite lokacije..."
                  data={sortByName(locations)}
                  {...field}
                />
              </FieldRow>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FieldRow label="Tip" hint="Vrsta nekretnine">
                <Select placeholder="Odaberite tip..." data={propertyType} {...field} />
              </FieldRow>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FieldRow label="Status" hint="Kupovina ili najam">
                <Select
                  placeholder="Odaberite status..."
                  data={propertyStatus}
                  {...field}
                />
              </FieldRow>
            )}
          />
          <Controller
            name="building"
            control={control}
            render={({ field }) => (
              <FieldRow label="Gradnja" hint="Tip gradnje">
                <Select placeholder="Odaberite gradnju..." data={building} {...field} />
              </FieldRow>
            )}
          />
          <Controller
            name="bedrooms"
            control={control}
            render={({ field }) => (
              <FieldRow label="Sobe" hint="Željeni broj soba">
                <Input placeholder="Npr. 2" type="number" {...field} />
              </FieldRow>
            )}
          />
          <Controller
            name="bathrooms"
            control={control}
            render={({ field }) => (
              <FieldRow label="Kupatila" hint="Željeni broj kupatila">
                <Input placeholder="Npr. 1" type="number" {...field} />
              </FieldRow>
            )}
          />
          <Controller
            name="floor"
            control={control}
            render={({ field }) => (
              <FieldRow label="Sprat" hint="Željeni sprat">
                <Input placeholder="Npr. 3" type="number" {...field} />
              </FieldRow>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 px-6 py-4">
        <Button type="submit" loading={loading}>
          {clientId ? "Sačuvaj izmjene" : "Kreiraj klijenta"}
        </Button>
      </div>
    </div>
  );
};

export default CreateClientStep1;
