// import useLocationForm from './Location/useLocationForm';
import Select from 'react-select';

function CustomeSelect({ name, options, value, className, onChange, placeholder }) {
    // chon tinh/thanh pho, quan huyen, phuong xa
    // const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } = useLocationForm(true);
    // const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
    // console.log(options);
    const defaultValue = (options, value) => {
        return options ? options.find((option) => option.value === value) : '';
    };

    return (
        <Select
            name={name}
            isDisabled={options.length === 0}
            options={options}
            onChange={(value) => onChange(value)}
            placeholder={placeholder}
            className={className}
            value={defaultValue(options, value)}
        />
    );
}

export default CustomeSelect;
