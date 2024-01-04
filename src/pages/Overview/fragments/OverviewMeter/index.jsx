import { useTheme } from 'styled-components';
import useMediaQuery from '@/hooks/useMediaQuery';
import useToDo from '@/hooks/useToDo';
import { getScreen } from '@/styles';
import {
  MeterBackdrop,
  MeterWrapper,
  MeterContainer,
  Container,
  Heading,
  MeterOverview,
  Percentage,
  MeterView,
} from './styles';

export default function OverviewMeter(props) {
  const { className } = props;
  const theme = useTheme();
  const { todos, todoCount, completedTodo } = useToDo();
  const isTablet = useMediaQuery(`(min-width: ${getScreen('tablet-min')})`);
  const todoPercentage = !!todoCount ? Math.round((completedTodo / todoCount) * 100) : 0;
  const datasets = [{ color: theme.colors.purple.active(), percentage: todoPercentage }];

  return (
    <Container className={className}>
      <Heading>
        <h4>Todo Meters</h4>
      </Heading>
      <MeterOverview>
        <MeterView>
          <Meter height={isTablet ? 120 : 100} dataset={datasets} />
          <Percentage>
            <h3>{todoPercentage}%</h3>
            <p>Done</p>
          </Percentage>
        </MeterView>
      </MeterOverview>
    </Container>
  );
}

function Meter({ height, dataset = [] }) {
  // NOTE: Scaling (CMD + +) bug with Safari
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
