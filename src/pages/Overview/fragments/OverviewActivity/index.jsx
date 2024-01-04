import useActivities from '@/hooks/useActivities';
import { Container, Heading, HeadingContainer, Options, ItemContainer, Item } from './styles';

export default function OverviewActivity(props) {
  const { className } = props;
  const { SORT_OPTIONS, sortActivities, activityCount, clearActivities, currentSort, activities } =
    useActivities();

  return (
    <Container className={className}>
      <Heading>
        <h4>Your activity</h4>
        <HeadingContainer>
          <Options
            title="Sort from oldest to latest"
            data-disabled={activityCount === 0}
            $active={currentSort === SORT_OPTIONS.ASC}
            onClick={sortActivities(SORT_OPTIONS.ASC)}
          >
            oldest
          </Options>
          <Options
            title="Sort from latest to oldest"
            data-disabled={activityCount === 0}
            $active={currentSort === SORT_OPTIONS.DESC}
            onClick={sortActivities(SORT_OPTIONS.DESC)}
          >
            newest
          </Options>
          <Options
            data-disabled={activityCount === 0}
            title="Clear activities lists"
            onClick={clearActivities}
          >
            clear
          </Options>
        </HeadingContainer>
      </Heading>
      <ItemContainer data-stack={!!activityCount}>
        {activities.map((activity) => (
          <ActivityItem
            key={`${activity.title.get()}-${activity.date.get()}`}
            content={activity.get()}
          />
        ))}
        {activityCount === 0 && <p className="empty-state">Nothing has been done!</p>}
      </ItemContainer>
    </Container>
  );
}

function ActivityItem({ content }) {
  const { title, date, type } = content;

  return (
    <Item>
      <div>
        <h5 title={title} className="truncate">
          {title}
        </h5>
        <p className="date truncate">{date}</p>
      </div>
      <p className="type">on {type}</p>
    </Item>
  );
}
