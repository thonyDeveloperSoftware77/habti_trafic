import React, { useEffect, useState } from "react";
interface DayOfWeekSelectorProps {
  onChange: (selected: string[]) => void;
}

function DayOfWeekSelector(props: DayOfWeekSelectorProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleSelect = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
    props.onChange(selectedDays); // Se llama a la función onChange que se pasó como prop desde el componente padre
  };

useEffect(() => {
    props.onChange(selectedDays);
  }, [selectedDays]);
  
  const isSelected = (day: string) => selectedDays.includes(day);

  return (
    <div>
      <button
        style={{ backgroundColor: isSelected("mon") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("mon")}
      >
        Mon
      </button>
      <button
        style={{ backgroundColor: isSelected("tue") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("tue")}
      >
        Tue
      </button>
      <button
        style={{ backgroundColor: isSelected("wed") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("wed")}
      >
        Wed
      </button>
      <button
        style={{ backgroundColor: isSelected("thu") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("thu")}
      >
        Thu
      </button>
      <button
        style={{ backgroundColor: isSelected("fri") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("fri")}
      >
        Fri
      </button>
      <button
        style={{ backgroundColor: isSelected("sat") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("sat")}
      >
        Sat
      </button>
      <button
        style={{ backgroundColor: isSelected("sun") ? "#4CAF50" : "" }}
        onClick={() => handleSelect("sun")}
      >
        Sun
      </button>
    </div>
  );
};

export default DayOfWeekSelector;