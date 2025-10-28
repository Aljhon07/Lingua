import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { usePhrasebook } from "@context/PhrasebookProvider";

const PhrasebookButton = () => {
  const { colors } = useTheme();
  const { setShowPhrasebook, showPhrasebook } = usePhrasebook();
  return   <IconButton
          icon="book-open-variant"
          size={24}
          onPress={() => setShowPhrasebook(!showPhrasebook)}
          iconColor={colors.onSurface}
        />;
};

export default PhrasebookButton;
