import { useState } from "react";

const parseValue = (v) => {
    if (!v) return { day: "", month: "", year: "" };
    const [year, month, day] = v.split("-");
    return {
        day: String(Number(day)),
        month: String(Number(month)),
        year,
    };
};

export default function DatePicker({ onChange, value }) {
    // const currentYear = new Date().getFullYear();
    // const [selectedDate, setSelectedDate] = useState("");
    // const [selectedMonth, setSelectedMonth] = useState("");
    // const [selectedYear, setSelectedYear] = useState("");
    // const [prevValue, setPrevValue] = useState(value);

    const currentYear = new Date().getFullYear();
    const [selectedDate, setSelectedDate] = useState(() => parseValue(value).day);
    const [selectedMonth, setSelectedMonth] = useState(() => parseValue(value).month);
    const [selectedYear, setSelectedYear] = useState(() => parseValue(value).year);
    const [prevValue, setPrevValue] = useState(value);
    // Isto corre DURANTE a renderização, não num efeito.
    // Se o value mudou desde a última vez, sincroniza os selects agora.
    // if (value !== prevValue) {
    //     setPrevValue(value);

    //     if (!value) {
    //         setSelectedDate("");
    //         setSelectedMonth("");
    //         setSelectedYear("");
    //     } else {
    //         const [year, month, day] = value.split("-");
    //         setSelectedDate(String(Number(day)));
    //         setSelectedMonth(String(Number(month)));
    //         setSelectedYear(year);
    //     }
    // }
    if (value !== prevValue) {
        setPrevValue(value);

        if (value) {
            const { day, month, year } = parseValue(value);
            setSelectedDate(day);
            setSelectedMonth(month);
            setSelectedYear(year);
        }
    }

    const handleDateChange = (e) => {
        const { value } = e.target;
        setSelectedDate(value);
        emitChange(value, selectedMonth, selectedYear);
    };

    const handleMonthChange = (e) => {
        const { value } = e.target;
        setSelectedMonth(value);
        emitChange(selectedDate, value, selectedYear);
    };

    const handleYearChange = (e) => {
        const { value } = e.target;
        setSelectedYear(value);
        emitChange(selectedDate, selectedMonth, value);
    };

    // Valida a combinação e avisa o componente pai (via onChange),
    // em vez de guardar o resultado só internamente.
    const emitChange = (date, month, year) => {
        if (!date || !month || !year) {
            onChange?.(null);
            return;
        }

        const dt = new Date(year, month - 1, date);

        // valida que a data existe de facto (ex: 31 de Fevereiro vira Março)
        if (dt.getDate() !== Number(date) || dt.getMonth() !== month - 1) {
            onChange?.(null);
            return;
        }

        // onChange?.(dt.toISOString().slice(0, 10)); // formato ISO: YYYY-MM-DD
        const yyyy = year;
        const mm = String(month).padStart(2, "0");
        const dd = String(date).padStart(2, "0");
        onChange?.(`${yyyy}-${mm}-${dd}`);
    };

    const renderDateOptions = () => {
        const dateOptions = [
            <option key={0} value={""} disabled>
                Dia
            </option>,
        ];

        for (let i = 1; i <= 31; i++) {
            dateOptions.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }

        return dateOptions;
    };

    const renderMonthOptions = () => {
        const monthOptions = [
            <option key={0} value={""} disabled>
                Mês
            </option>,
        ];

        for (let i = 1; i <= 12; i++) {
            monthOptions.push(
                <option key={i} value={i}>
                    {new Date(2000, i - 1, 1).toLocaleString("pt-PT", {
                        month: "long",
                    })}
                </option>
            );
        }

        return monthOptions;
    };

    const renderYearOptions = () => {
        const yearOptions = [
            <option key={0} value={""} disabled>
                Ano
            </option>,
        ];

        for (let i = currentYear; i >= 1900; i--) {
            yearOptions.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }

        return yearOptions;
    };

    // Classe base aplicada a cada select — sem UI nativa, pronta a customizar
    const selectClass =
        "appearance-none bg-transparent border border-gray-300 rounded-md " +
        "px-3 pr-8 text-sm text-gray-800 cursor-pointer " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        "w-full";

    return (
        <div className="">
            <div className="">
                <div className="flex flex-row">
                    <div className="app-select relative flex-1">
                        {/* <p>DD</p> */}
                        <select value={selectedDate} onChange={handleDateChange} className={`${selectClass} text-center`}>
                            {renderDateOptions()}
                        </select>
                    </div>
                    <div className="app-select">
                        {/* <p>MM</p> */}
                        <select value={selectedMonth} onChange={handleMonthChange} className={`${selectClass} text-center`}>
                            {renderMonthOptions()}
                        </select>
                    </div>
                    <div className="app-select">
                        {/* <p>YYYY</p> */}
                        <select value={selectedYear} onChange={handleYearChange} className={`${selectClass} text-center`}>
                            {renderYearOptions()}
                        </select>
                    </div>
                </div>
            </div>
        </div >
    )
}
