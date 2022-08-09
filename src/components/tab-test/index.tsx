import { FC, useState } from 'react';
import { Button, Tab, TabBar, TabPane, TabPanes, Tabs } from '@domo/bits-react';

export const TabTest: FC = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  return (
    <Tabs tabBarPlacement="above">
      <TabBar
        alignment="start"
        onChange={function noRefCheck() {}}
        orientation="horizontal"
        separator
      >
        <Tab onSelect={function noRefCheck() {}}>Cats</Tab>
        <Tab onSelect={function noRefCheck() {}}>Dogs</Tab>
        <Tab onSelect={function noRefCheck() {}}>Mice</Tab>
        <Button
          onClick={() => {
            setButtonClicked(true);
            console.log(buttonClicked);
          }}
        >
          Test
        </Button>
      </TabBar>
      <TabPanes>
        <TabPane>Meow Meow</TabPane>
        <TabPane>Woof Woof</TabPane>
        <TabPane>Squeak Squeak</TabPane>
        <div>Button is clicked</div>
      </TabPanes>
    </Tabs>
  );
};
