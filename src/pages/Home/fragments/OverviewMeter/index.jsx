import { useTheme } from 'styled-components';
import { useHookstate } from '@hookstate/core';
import { TODO_STATE_PROVIDER } from '@/utils/states';
import {
  MeterBackdrop,
  MeterWrapper,
  MeterContainer,
  Container,
  Heading,
  MeterOverview,
  Percentage,
} from './styles';

export default function OverviewMeter() {
  const theme = useTheme();
  const toDoState = useHookstate(TODO_STATE_PROVIDER);
  const totalTodo = toDoState.length;
  const doneTodo = toDoState.filter((todo) => todo.done.get()).length;
  const todoPercentage = Math.round((doneTodo / totalTodo) * 100);
  const datasets = [{ color: theme.colors.purple.active(), percentage: todoPercentage }];

  return (
    <Container>
      <Heading>
        <h4>Todo Meters</h4>
      </Heading>
      <MeterOverview>
        <Meter height={80} dataset={datasets} />
        <Percentage>
          <h3>{todoPercentage}%</h3>
          <p>Done</p>
        </Percentage>
      </MeterOverview>
    </Container>
  );
}

function Meter({ height, dataset = [] }) {
  const theme = useTheme();
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const datasets = [{ color: theme.colors.purple.base(), percentage: 100 }].concat(dataset);

  return (
    <MeterWrapper $height={height}>
      {datasets.map((data, idx) => (
        <MeterContainer
          key={data.color}
          height={height * 2}
          style={{ zIndex: idx }}
          viewBox="0 0 120 120"
        >
          <MeterBackdrop
            strokeWidth="7"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            stroke={data.color}
            strokeLinecap="round"
            $offset={circumference - (data.percentage / 2 / 100) * circumference}
            $circumference={circumference}
          />
        </MeterContainer>
      ))}
    </MeterWrapper>
  );
}