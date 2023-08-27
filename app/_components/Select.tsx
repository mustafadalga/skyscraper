import Select, { GroupBase, Props as SelectProps } from 'react-select';

export interface OptionType {
    label: string;
    value: string | number;
}

interface CustomSelectProps extends Omit<SelectProps<OptionType, false, GroupBase<OptionType>>, 'options'> {
    options: Array<OptionType>;
}

const CustomSelect = ({ options, ...restProps }: CustomSelectProps) => {
    return (
        <Select
            options={options}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: '#f3e8ff',//100
                    primary: '#a855f7',//300
                    neutral0: "white",
                    primary75: 'lime',
                    neutral5: 'lime',
                    neutral10: 'lime',
                    neutral30: '#a855f7',
                    neutral40: '#111827',
                    neutral50: '#111827',
                    neutral70: '#111827',
                    neutral80: '#111827',
                },
            })}
            styles={{
                menuList: (base) => ({
                    ...base,
                    paddingTop: 0,
                    paddingBottom: 0,
                }),
            }}
            className="text-xs lg:text-sm"
            {...restProps}
        />
    );
};

export default CustomSelect;
