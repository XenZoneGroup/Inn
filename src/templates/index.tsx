import * as React from 'react';

//TODO - handle special characters...
const slugify = (s: string) => s.replace(/\s+/g, '-').toLowerCase();

const stringToRadioButton = (
  name: string,
  s: string,
  onSelect: (val: string) => void
) => {
  const slug = slugify(s);

  return (
    <React.Fragment key={slug}>
      <input
        name={name}
        value={s}
        key={slug}
        type="radio"
        id={slug}
        onClick={_ => onSelect(slug)} // TODO: change to onChange
        data-testid={slug}
      />
      <label className="button" key={`${slug}-label`} htmlFor={slug}>
        {s}
      </label>
    </React.Fragment>
  );
};

const dropDownOption = (text: string, value: string | null = null) => {
  const slug = slugify(text);
  if (value === null) {
    value = slug;
  }

  return (
    <option key={slug} value={value} id={slug} data-testid={slug}>
      {text}
    </option>
  );
};

const checkBox = (
  text: string,
  name: string,
  checked: boolean,
  onChange: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const slug = slugify(text);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked);
  };

  return (
    <React.Fragment>
      <label className="checkbox" htmlFor={slug}>
        <input
          type="checkbox"
          data-testid={name}
          name={name}
          id={slug}
          onChange={changeHandler}
          checked={checked}
        />
        <span className="checkhint">{text}</span>
      </label>
    </React.Fragment>
  );
};

const nextButton = () => (
  <input type="submit" value="NEXT" data-testid="submit" />
);

const tickGlyph = (text: string, active: boolean, testId? : string) => {
  return (
    <li className={active ? 'glyph tick' : 'glyph cross'} data-testid={ testId || "not-set" }>
      <span className="glyph-symbol">{active ? '✓' : '✗'}</span>
      <span className="glyph-text">{" " + text}</span>
    </li>
  );
};

const dropDownMenu = (
  label: string,
  id: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  options: string[],
  values?: string[]
) => {
  return (
    <div className="drop-down">
      <label htmlFor={id}> {label} </label>
      <select id={id} data-testid={id} onChange={onChange}>
        {options.map((o, i) => {
          return values ? dropDownOption(o, values[i]) : dropDownOption(o);
        })}
      </select>
    </div>
  );
};

export {
  slugify,
  stringToRadioButton,
  dropDownOption,
  nextButton,
  checkBox,
  tickGlyph,
  dropDownMenu,
};
