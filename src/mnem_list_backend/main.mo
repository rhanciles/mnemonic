actor {
  public query func addEntry(entry : Text) : async Text {
    return "Your text:, " # entry # ".";
  };
};
